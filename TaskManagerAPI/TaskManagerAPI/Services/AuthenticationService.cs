using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        public async Task<AdminResponseDTO> AddUser(SignUpRequestDTO request)
        {
            var user = await _AuthenticationRepository.GetUserByEmail(request.Email);
            if (user == null)
            {
                var userObj = new Admin()
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    Role = request.Role,
                };

                var userData = await _AuthenticationRepository.AddUser(userObj);

                var response = new AdminResponseDTO()
                {
                    UserId = userData.Id,
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
            var response = new AdminResponseDTO()
            {
                UserId = userDetails.Id,
                FullName = userDetails.FullName,
                Email = userDetails.Email,
                Role = userDetails.Role,
            };

            return GenerateToken(userDetails);
        }


        public TokenModel GenerateToken(Admin user)
        {
            var claimList = new List<Claim>();
            claimList.Add(new Claim("UserId", user.Id.ToString()));
            claimList.Add(new Claim("Name", user.FullName));
            claimList.Add(new Claim("Email", user.Email));
            claimList.Add(new Claim("Role", user.Role.ToString()));



            var key = _configuration["Jwt:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credintial = new SigningCredentials(secKey , SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims:claimList,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credintial
            );

            var res = new TokenModel();
            res.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return res;
        }
    }
}
