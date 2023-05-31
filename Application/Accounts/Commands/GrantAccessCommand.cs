using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using MediatR;

namespace Application.Accounts.Commands
{
   // [Authorize(Roles ="Admin")]
    public record GrantAccessCommand : IRequest<bool>
    {
        public string Username { get; set; }
        public string Role { get; set; }
    }

    public class GrantAccessCommandHandler : IRequestHandler<GrantAccessCommand, bool>
    {
        private readonly IIdentityService _context;

        public GrantAccessCommandHandler(IIdentityService context)
        {
            _context = context;

        }

        public async Task<bool> Handle(GrantAccessCommand request, CancellationToken cancellationToken)
        {

            return await _context.AuthorizeAsync(request.Username, request.Role);
        }
    }
}
