using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.DTO.ResponseDTO;
using TaskManagerAPI.Entity;

namespace TaskManagerAPI.IService
{
    public interface IAuthenticationService
    {
        Task<AdminResponseDTO> AddUser(SignUpRequestDTO request);
        Task<string> Login(LoginRequestDTO request);
    }
}
