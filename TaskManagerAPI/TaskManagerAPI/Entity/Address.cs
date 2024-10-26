using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Entity
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required]
        public required string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;


        public User? User { get; set; }

    }
}
