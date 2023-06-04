using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetSoldItemsQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetSoldItemsQueryHandler : IRequestHandler<GetSoldItemsQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetSoldItemsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetSoldItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Sold)
                .GroupBy( i => i.PartNumber)
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().Model,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
