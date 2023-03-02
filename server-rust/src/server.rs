use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use std::env::set_var;
use std::io::Result;
use std::sync::Mutex;
use uuid::Uuid;

use crate::models::server_context_model::ServerContext;
use crate::routes::api_v1_router::api_v1_router;
use crate::routes::healthcheck_router::{healthcheck, smoketest};
use crate::routes::not_found_router::not_found;

pub struct Server {
    address: String,
    port: u16,
}

impl Server {
    pub fn new(address: String, port: u16) -> Self {
        Server { address, port }
    }

    pub async fn run(&self) -> Result<()> {
        // dotenv().ok();

        set_var("RUST_LOG", "actix_web=info");
        env_logger::init();
        println!("Starting http server: {}:{}", self.address, self.port);

        let data = web::Data::new(Mutex::new(ServerContext {
            requestId: Uuid::new_v4().to_string(), // report_date: None,
                                                   // dora_metrics_data: None,
        }));

        HttpServer::new(move || {
            // TODO: fine tune CORS
            let cors = Cors::permissive();

            App::new()
                // https://docs.rs/actix-web/0.5.8/actix_web/middleware/struct.Logger.html
                .wrap(Logger::default())
                .wrap(cors)
                .app_data(data.clone())
                .service(web::resource("/api/v1/query").route(web::post().to(api_v1_router)))
                // .service(
                //     web::resource("/api/v1/reports/{report_type}")
                //         .route(web::get().to(daily_report)),
                // )
                .service(web::resource("/smoketest").route(web::get().to(smoketest))) // { status: "OK"}
                .service(web::resource("/healthcheck").route(web::get().to(healthcheck))) // "OK"
                .default_service(web::route().to(not_found))
        })
        .bind((self.address.to_owned(), self.port))?
        .run()
        .await
    }
}
