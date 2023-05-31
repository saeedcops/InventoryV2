using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Queries
{
   
    public record GetPartsQuery : IRequest<List< Part>>
    {
        public int Id { get; init; }
    }

    public class GetPartsQueryHandler : IRequestHandler<GetPartsQuery, List<Part>>
    {
        private readonly IApplicationDbContext _context;
      //  private readonly IMapper _mapper;

        public GetPartsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
           // _mapper = mapper;
        }

        public async Task<List<Part>> Handle(GetPartsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Include(p => p.Brand)
                .Include(p => p.Engineer)
                .Include(p => p.Customer)
                .Include(p => p.Warehouse)
                .ToListAsync();
        }
    }
}
