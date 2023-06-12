using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class JwtToken
    {
        private readonly IConfiguration _conf;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<IdentityUser> _userManager;

        public JwtToken(IConfiguration conf, UserManager<IdentityUser> userManager)
        {
            _conf = conf;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["Token:Key"]));
            _userManager = userManager;
        }

        public string GenerateToken(IdentityUser user)
        {

            var roles = _userManager.GetRolesAsync(user).Result;
            StringBuilder roleBuilder = new StringBuilder();
            foreach (var role in roles)
                roleBuilder.Append(role.ToString()).Append(",");

            var claimes = new List<Claim> {

            new Claim(ClaimTypes.Email,user.UserName),
            new Claim(ClaimTypes.Role,roleBuilder.ToString()),
        };

            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var desc = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddHours(1),
                Subject = new ClaimsIdentity(claimes),
                SigningCredentials = cred,
                Issuer = _conf["Token:Issuer"]
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(desc);
            return handler.WriteToken(token);
        }
    }

}
