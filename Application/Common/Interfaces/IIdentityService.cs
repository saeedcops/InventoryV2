using Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);
        Task<List<UserDto>> GetUsersRoleAsync();

        Task<bool> IsInRoleAsync(string userId, string role);
        Task<TokenResponse> LoginAsync(TokenRequest loginDto);
        Task<Result> RegisterAsync(TokenRequest register);

        Task<bool> AuthorizeAsync(string userId, string role);
        Task<bool> RevokeAuthorizeAsync(string userId, string role);

        Task<Result> DeleteUserAsync(string userId);
    }

}
