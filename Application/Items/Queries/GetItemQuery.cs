using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
  //  [Authorize(Roles ="AddItem")]
    public record GetItemQuery : IRequest<Item>
    {
        public int Id { get; init; }
    }

    public class GetItemQueryHandler : IRequestHandler<GetItemQuery, Item>
    {
        private readonly IApplicationDbContext _context;
      //  private readonly IMapper _mapper;

        public GetItemQueryHandler(IApplicationDbContext context)
        {
            _context = context;
           // _mapper = mapper;
        }

        public async Task<Item> Handle(GetItemQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Include(i => i.Brand)
                .Include(i => i.Customer)
                .Include(i => i.Engineer)
                .Include(i => i.Warehouse).FirstOrDefaultAsync(i => i.Id == request.Id);
        }
    }
}
