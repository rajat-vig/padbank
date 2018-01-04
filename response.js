module.exports.createResponseObject = function (flag, msg, data){
    var ResponseModel = {
        success: flag,
        responseMessage: msg,
        responseData: data
    };
    return ResponseModel;
}
