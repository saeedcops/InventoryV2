using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Commands
{
    [Authorize(Roles = "User")]
    public record UpdatePartCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? OracleCode { get; set; }
        public string? Model { get; set; }
        public string AddVoucher { get; set; }
        public string LocalCode { get; set; }

        public string? Description { get; set; }
        public int? BrandId { get; set; }
        public int? WarehouseId { get; set; }
        public int? EngineerId { get; set; }

        public int? CustomerId { get; set; }
        public byte[]? Image { get; set; }
    }

    public class UpdatePartCommandHandler : IRequestHandler<UpdatePartCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdatePartCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Parts.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Parts with {request.Id}");

            entity.PartNumber = request.PartNumber != null ? request.PartNumber : entity.PartNumber;
            entity.OracleCode = request.OracleCode != null ? request.OracleCode : entity.OracleCode;
            entity.LocalCode = request.LocalCode != null ? request.LocalCode : entity.LocalCode;
            entity.Model = request.Model != null ? request.Model : entity.Model;
            entity.Image = request.Image != null ? request.Image : entity.Image;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            entity.AddVoucher = request.AddVoucher != null ? request.AddVoucher : entity.AddVoucher;
            entity.WarehouseId = request.WarehouseId != null ? (int)request.WarehouseId : entity.WarehouseId;
            entity.CustomerId = request.CustomerId != null ? (int)request.CustomerId : entity.CustomerId;
            entity.EngneerId = request.EngineerId != null ? (int)request.EngineerId : entity.EngneerId;
         
            _context.Parts.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }

}
