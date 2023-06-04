using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetPartsPartNumberQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetPartsPartNumberQueryHandler : IRequestHandler<GetPartsPartNumberQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetPartsPartNumberQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetPartsPartNumberQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Where(i => i.PartStatus == Domain.Enum.ItemStatus.stored)
                .GroupBy( i => i.PartNumber)
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().PartNumber,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
