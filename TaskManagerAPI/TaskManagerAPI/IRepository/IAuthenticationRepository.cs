using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.Entity;

namespace TaskManagerAPI.IRepository
{
    public interface IAuthenticationRepository
    {
        Task<UserSignup> AddUser(UserSignup user);
        Task<UserSignup> GetUserByEmail(string email);
        Task<UserSignup> Login(LoginRequestDTO request);
    }
}
