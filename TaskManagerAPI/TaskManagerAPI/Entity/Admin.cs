using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Entity
{
    public class Admin
    {
        [Key]
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserRole Role { get; set; }
    }
    public enum UserRole
    {
        Admin = 1,
        Editor = 2,
        Viewer = 3
    }
}
