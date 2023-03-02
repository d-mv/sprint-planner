use actix_web::HttpResponse;
use actix_web::ResponseError;
use reqwest::StatusCode;

#[derive(Debug)]
pub enum CustomErrorType {
    UserError(String),
}

#[derive(Debug)]
pub struct CustomError {
    pub message: String,
    pub err_type: CustomErrorType,
}

impl std::fmt::Display for CustomError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl From<String> for CustomError {
    fn from(err: String) -> CustomError {
        CustomError {
            message: err,
            err_type: CustomErrorType::UserError(String::from("unknown")),
        }
    }
}

impl ResponseError for CustomError {
    fn status_code(&self) -> StatusCode {
        match self.err_type {
            CustomErrorType::UserError(_) => StatusCode::MISDIRECTED_REQUEST,
        }
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code()).json(self.message.clone())
    }
}
