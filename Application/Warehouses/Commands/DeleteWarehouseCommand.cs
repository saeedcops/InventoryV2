using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Warehouses.Commands
{
   public record DeleteWarehouseCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteWarehouseCommandHandler : IRequestHandler<DeleteWarehouseCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeleteWarehouseCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteWarehouseCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Warehouses.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Warehouses with {request.Id}");

             _context.Warehouses.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }

}
