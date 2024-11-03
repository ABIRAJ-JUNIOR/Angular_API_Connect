using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTO.RequestDTO
{
    public class LoginRequestDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
