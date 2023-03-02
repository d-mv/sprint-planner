use std::sync::Mutex;

use actix_web::{
    web::{self, Json, JsonBody},
    HttpRequest, HttpResponse, Responder,
};

use crate::models::{query_model::{QueryConnect, QueryConnectN}, server_context_model::ServerContext};

pub async fn api_v1_router(
    req: Json<QueryConnectN>,
    data: web::Data<Mutex<ServerContext>>,
) -> impl Responder {
    println!("{:#?}", req.payload);

    HttpResponse::Ok().body(format!("ReqId {}. Got it!", data.lock().unwrap().requestId))
}
