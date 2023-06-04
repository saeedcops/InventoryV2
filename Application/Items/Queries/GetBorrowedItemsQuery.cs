using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetBorrowedItemsQuery : IRequest<int>
    {
    }

    public class GetBorrowedItemsQueryHandler : IRequestHandler<GetBorrowedItemsQuery, int>
    {
        private readonly IApplicationDbContext _context;

        public GetBorrowedItemsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(GetBorrowedItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Borrowed)
                .CountAsync();
        }
    }
}
