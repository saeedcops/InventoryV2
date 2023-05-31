using Application.Common.Interfaces;
using Application.Common.Security;
using MediatR;
using System.Data;

namespace Application.Accounts.Commands
{
    //[Authorize(Roles = "Admin")]
    public record RevokeAccessCommand : IRequest<bool>
    {
        public string Username { get; set; }
        public string Role { get; set; }
    }

    public class RevokeAccessCommandHandler : IRequestHandler<RevokeAccessCommand, bool>
    {
        private readonly IIdentityService _context;

        public RevokeAccessCommandHandler(IIdentityService context)
        {
            _context = context;

        }

        public async Task<bool> Handle(RevokeAccessCommand request, CancellationToken cancellationToken)
        {

            return await _context.RevokeAuthorizeAsync(request.Username, request.Role);
        }
    }
}
