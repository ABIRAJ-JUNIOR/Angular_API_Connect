using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.Entity;

namespace TaskManagerAPI.IRepository
{
    public interface IAuthenticationRepository
    {
        Task<Admin> AddUser(Admin user);
        Task<Admin> GetUserByEmail(string email);
        Task<Admin> Login(LoginRequestDTO request);
    }
}
