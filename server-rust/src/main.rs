use std::env;
use dotenv::dotenv;

use server::Server;

// use crate::options::options;

// mod aggregators;
// mod dal;
// mod data;
mod errors;
mod models;
// mod options;
// mod processes;
mod routes;
mod server;
// mod tools;

#[warn(unused_must_use)]
#[actix_web::main]
async fn start_server(address: String, port: u16) {
    let app = Server::new(address, port);
    app.run().await.map_err(|err| println!("{:?}", err)).ok();
}

fn main() {
    dotenv().ok();
    let address = match env::var("SERVER_ADDRESS") {
        Ok(address) => address,
        Err(_) => "localhost".to_string(),
    };

    let port = match env::var("PORT") {
        Ok(address) => address.parse::<u16>().unwrap_or(8888),
        Err(_) => 8888,
    };

    // console_subscriber::init(); -- use for monitoring of tokio instances

    start_server(address, port);
}
