using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Application.Engineers.Queries
{
   public record GetEngineersQuery : IRequest<List<Engineer>>
    {
    }

    public class GetEngineersQueryHandler : IRequestHandler<GetEngineersQuery, List<Engineer>>
    {
        private readonly IApplicationDbContext _context;
        //  private readonly IMapper _mapper;

        public GetEngineersQueryHandler(IApplicationDbContext context)
        {
            _context = context;
            // _mapper = mapper;
        }

        public async Task<List<Engineer>> Handle(GetEngineersQuery request, CancellationToken cancellationToken)
        {
            return await _context.Engineers.ToListAsync();
        }
    }
}
