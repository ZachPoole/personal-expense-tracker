using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MadeColorOptionClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Tags");

            migrationBuilder.AddColumn<Guid>(
                name: "ColorId",
                table: "Tags",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "ColorOption",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorOption", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tags_ColorId",
                table: "Tags",
                column: "ColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_ColorOption_ColorId",
                table: "Tags",
                column: "ColorId",
                principalTable: "ColorOption",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_ColorOption_ColorId",
                table: "Tags");

            migrationBuilder.DropTable(
                name: "ColorOption");

            migrationBuilder.DropIndex(
                name: "IX_Tags_ColorId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "Tags");

            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "Tags",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
