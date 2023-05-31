using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Parts.Commands
{
   public record UpdatePartCommand : IRequest<Part>
    {
        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? OracleCode { get; set; }
        public string? Model { get; set; }
        public string? Description { get; set; }
        public int? BrandId { get; set; }
        public int? WarehouseId { get; set; }
        public int? EngineerId { get; set; }
        public int? CustomerId { get; set; }
        public byte[]? Image { get; set; }
    }

    public class UpdatePartCommandHandler : IRequestHandler<UpdatePartCommand, Part>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Part> Handle(UpdatePartCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Parts.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Brands with {request.Id}");

            entity.PartNumber = request.PartNumber != null ? request.PartNumber : entity.PartNumber;
            entity.OracleCode = request.OracleCode != null ? request.OracleCode : entity.OracleCode;
            entity.Model = request.Model != null ? request.Model : entity.Model;
            entity.Image = request.Image != null ? request.Image : entity.Image;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            entity.BrandId = request.BrandId != null ? (int)request.BrandId : entity.BrandId;
            entity.WarehouseId = request.WarehouseId != null ? (int)request.WarehouseId : entity.WarehouseId;
            entity.CustomerId = request.CustomerId != null ? (int)request.CustomerId : entity.CustomerId;
            entity.EngneerId = request.EngineerId != null ? (int)request.EngineerId : entity.EngneerId;
         
            _context.Parts.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
