using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseParts.Commands
{
  public record UpdatePurchasePartCommand : IRequest<int>
    {
        public string PartNumber { get; set; }
        public string OracleCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[]? Image { get; set; }
    }

    public class UpdatePurchasePartCommandHandler : IRequestHandler<UpdatePurchasePartCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePurchasePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdatePurchasePartCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PurchaseParts.FirstOrDefaultAsync(b => b.PartNumber == request.PartNumber);
            if (entity == null)
                throw new NotFoundException($"No PurchaseParts with {request.PartNumber}");

            entity.OracleCode = request.OracleCode != null ? request.OracleCode : entity.OracleCode;
            entity.Name = request.Name != null ? request.Name : entity.Name;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            entity.Image = request.Image != null ? request.Image : entity.Image;
          
          
            _context.PurchaseParts.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
