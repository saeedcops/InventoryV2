
using System.ComponentModel.DataAnnotations;

namespace Application.Common.Models
{
       public class TokenRequest
    {
   
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
