using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetItemsPartNumberQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetItemsPartNumberQueryHandler : IRequestHandler<GetItemsPartNumberQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetItemsPartNumberQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetItemsPartNumberQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.stored)
                .GroupBy( i => i.PartNumber)
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().PartNumber,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
