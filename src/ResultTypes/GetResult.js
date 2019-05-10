var OperationResult = require('../Abstractions/OperationResult');

class GetResult extends OperationResult{

  /**
   * Constructor
   * 
   * apiResponse = {
   *   body: {
   *      error: '',
   *      message: ''
   *   }
   *   status: 200
   * }
   * 
   * @param {object|null} apiResponse
   * @param {string|null} errorMessage
   */
  constructor(apiResponse = null, errorMessage = null) {
    if (!apiResponse) {
      this.isSuccess = false;
      this.errorMessage = errorMessage;
    }
    else {
      var statusCode = apiResponse.status
      var body = apiResponse.body

      this.errorMessage = (this.errorMessage) ? this.errorMessage : (body.error) ? body.error : null;
      if (statusCode >= 200 && statusCode < 300) {
        this.isSuccess = (this.errorMessage.length == 0);
      }
      else {
        this.isSuccess = false;
        if (!this.errorMessage) {
          if (body.message) {
            this.errorMessage = body.message;
          }
          else if (statusCode >= 500) {
            this.errorMessage = statusCode + ': Maropost experienced a server error and could not complete your request.';
          }
          else if (statusCode >= 400) {
            this.errorMessage = statusCode + ': Either your accountId, authToken, or one (or more) of your function arguments are invalid.';
          }
          else if (statusCode >= 300) {
            this.errorMessage = statusCode + ': This Maropost API function is currently unavailable.';
          }
          else {
            this.errorMessage = statusCode + ': Unexpected final response from Maropost.';
          }
        }
      }
    }
  }
}

module.exports = GetResult;