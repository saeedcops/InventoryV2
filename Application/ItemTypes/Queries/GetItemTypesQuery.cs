using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ItemTypes.Queries
{
   public record GetItemTypesQuery : IRequest<List<ItemType>>
    {
    }

    public class GetItemTypesQueryHandler : IRequestHandler<GetItemTypesQuery, List<ItemType>>
    {
        private readonly IApplicationDbContext _context;
        //  private readonly IMapper _mapper;

        public GetItemTypesQueryHandler(IApplicationDbContext context)
        {
            _context = context;
            // _mapper = mapper;
        }

        public async Task<List<ItemType>> Handle(GetItemTypesQuery request, CancellationToken cancellationToken)
        {
            return await _context.ItemTypes.ToListAsync();
        }
    }
}
