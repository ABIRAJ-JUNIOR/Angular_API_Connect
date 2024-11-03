using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.DTO.ResponseDTO;
using TaskManagerAPI.Entity;
using TaskManagerAPI.IRepository;
using TaskManagerAPI.IService;

namespace TaskManagerAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IAuthenticationRepository _AuthenticationRepository;
        private readonly IConfiguration _configuration;

        public AuthenticationService(IAuthenticationRepository authenticationRepository, IConfiguration configuration)
        {
            _AuthenticationRepository = authenticationRepository;
            _configuration = configuration;
        }

        public async Task<UserResponseDTO> AddUser(SignUpRequestDTO request)
        {
            var user = await _AuthenticationRepository.GetUserByEmail(request.Email);
            if (user == null)
            {
                var userObj = new UserSignup()
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    Role = request.Role,
                };

                var userData = await _AuthenticationRepository.AddUser(userObj);

                var response = new UserResponseDTO()
                {
                    UserId = userData.UserId,
                    FullName = userData.FullName,
                    Email = userData.Email,
                    Role = userData.Role,
                };

                return response;
            }
            else
            {
                throw new Exception("User already exists");
            }
        }

        public async Task<TokenModel> Login(LoginRequestDTO request)
        {
            var userDetails = await _AuthenticationRepository.Login(request);
            var response = new UserResponseDTO()
            {
                UserId = userDetails.UserId,
                FullName = userDetails.FullName,
                Email = userDetails.Email,
                Role = userDetails.Role,
            };

            return GenerateToken();
        }


        public TokenModel GenerateToken()
        {
            var key = _configuration["Jwt:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credintial = new SigningCredentials(secKey , SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credintial
            );

            var res = new TokenModel();
            res.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return res;
        }
    }
}
