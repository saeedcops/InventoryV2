using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetBorrowedPartsQuery : IRequest<int>
    {
    }

    public class GetBorrowedPartsQueryHandler : IRequestHandler<GetBorrowedPartsQuery, int>
    {
        private readonly IApplicationDbContext _context;

        public GetBorrowedPartsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(GetBorrowedPartsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Where(i => i.PartStatus == Domain.Enum.ItemStatus.Borrowed)
                .CountAsync();
        }
    }
}
