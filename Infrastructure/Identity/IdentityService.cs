using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IUserClaimsPrincipalFactory<IdentityUser> _userClaimsPrincipalFactory;
        private readonly IAuthorizationService _authorizationService;
        private readonly JwtToken _jwtToken;
        public IdentityService(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IUserClaimsPrincipalFactory<IdentityUser> userClaimsPrincipalFactory,
            IAuthorizationService authorizationService,
            JwtToken jwtToken)
        {
            _userManager = userManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _authorizationService = authorizationService;
            _signInManager = signInManager;
            _jwtToken = jwtToken;
        }


        public async Task<TokenResponse> LoginAsync(TokenRequest loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return null;
            }

            var roles =await _userManager.GetRolesAsync(user);
            StringBuilder roleBuilder = new StringBuilder();
            foreach (var role in roles)
                roleBuilder.Append(role.ToString()).Append(",");

            return new TokenResponse
            {
                User = user.Email,
                Role = roleBuilder.ToString(),
                Token = _jwtToken.GenerateToken(user)
            };
        }
        public async Task<Result> RegisterAsync(TokenRequest registerDto)
        {
            var appUser = new IdentityUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
            };
            var user = await _userManager.CreateAsync(appUser, registerDto.Password);
           

            return user.ToApplicationResult();
        }
        public async Task<string> GetUserNameAsync(string email)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Email == email);

            return user.UserName;
        }

        public async Task<bool> IsInRoleAsync(string email, string role)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == email);

            
            return user != null && await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<bool> AuthorizeAsync(string email, string policyName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == email);

            if (user == null)
            {
                return false;
            }

            var result = await _userManager.AddToRoleAsync(user, policyName);

            return result.Succeeded;
        }

        public async Task<bool> RevokeAuthorizeAsync(string email, string policyName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == email);

            if (user == null)
            {
                return false;
            }

            var result = await _userManager.RemoveFromRoleAsync(user, policyName);

            return result.Succeeded;
        }
        public async Task<Result> DeleteUserAsync(string email)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == email);

            return user != null ? await DeleteUserAsync(user) : Result.Failure(new []{"User Not Exist."});
        }

        private async Task<Result> DeleteUserAsync(IdentityUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<List<UserDto>> GetUsersRoleAsync()
        {
            return await _userManager.Users.Select(c => new UserDto()
                    {
                        Username = c.UserName,
                        Role = string.Join(",", _userManager.GetRolesAsync(c).Result.ToArray())
                    }).ToListAsync();
             
        }

        
    }
}
