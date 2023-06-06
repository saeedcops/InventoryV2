using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetExceededPartsPartNumberQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetExceededPartsPartNumberQueryHandler : IRequestHandler<GetExceededPartsPartNumberQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetExceededPartsPartNumberQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetExceededPartsPartNumberQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Where(i => i.PartStatus == Domain.Enum.ItemStatus.stored)
                .GroupBy( i => i.PartNumber)
                .Where(i => i.First().ExceededLimit > i.Count())
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().PartNumber,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
