using TaskManagerAPI.Entity;

namespace TaskManagerAPI.DTO.ResponseDTO
{
    public class UserResponseDTO
    {
        public Guid UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole Role { get; set; }
    }
}
