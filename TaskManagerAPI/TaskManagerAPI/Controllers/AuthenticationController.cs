using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.IService;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _AuthenticationService;

        public AuthenticationController(IAuthenticationService userService)
        {
            _AuthenticationService = userService;
        }

        [HttpPost("add-user")]

        public async Task<IActionResult> AddUser( SignUpRequestDTO request)
        {
            try
            {
                var userData = await _AuthenticationService.AddUser(request);
                return Ok(userData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(LoginRequestDTO request)
        {
            try
            {
                var userDetails = await _AuthenticationService.Login(request);
                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
