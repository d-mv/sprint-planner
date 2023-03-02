use std::sync::Mutex;

use actix_web::{web, HttpRequest, HttpResponse, Responder};

use crate::{errors::CustomError, models::server_context_model::ServerContext};

pub async fn not_found(req: HttpRequest, data: web::Data<Mutex<ServerContext>>) -> impl Responder {
    println!(
        "Request {}: path {} not found",
        data.lock().unwrap().requestId,
        req.path()
    );
    HttpResponse::NotFound().body(CustomError::from(format!("Path not {} found.",req.path())).message)
}
