using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.dto;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        IConfiguration _config;

        public UserManagementController(IConfiguration conf)
        {
            _config = conf;
        }

        [HttpPost("signup", Name = "PostSignUp")]
        public JsonResult post([FromBody] User usr)
        {
            return new JsonResult(new DBManager(_config).sign_up(
                usr.email, 
                usr.password, 
                usr.name, 
                usr.last_name, 
                usr.second_last_name,
                usr.birth_date,
                usr.phone_number));
        }

        [HttpPost("signin", Name = "PostSignIn")]
        public JsonResult post([FromBody] UserSignIn usr)
        {
            return new JsonResult(new DBManager(_config).sign_in(usr.email, usr.password));
        }

        [HttpPost("deleteuser", Name = "PostDeleteUser")]
        public JsonResult post([FromBody] DeleteUser usr)
        {
            return new JsonResult(new DBManager(_config).delete_user(usr.email));
        }
    }
}

