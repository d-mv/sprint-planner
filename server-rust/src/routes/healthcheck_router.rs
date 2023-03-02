use actix_web::{HttpResponse, Responder};
use serde_derive::Serialize;

pub async fn healthcheck() -> impl Responder {
    HttpResponse::Ok().body(String::from("OK"))
}

#[derive(Serialize)]
struct SmoketestResult {
    status: String,
}

pub async fn smoketest() -> impl Responder {
    let status = SmoketestResult {
        status: String::from("OK"),
    };
    HttpResponse::Ok().body(serde_json::to_string(&status).unwrap())
}
