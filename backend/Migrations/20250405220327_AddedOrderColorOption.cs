using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedOrderColorOption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "ColorOption",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("5b0a3fc3-eebb-4713-ae3d-c846b00821cd"),
                column: "Order",
                value: 4);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("6513a135-199e-4613-8ea7-12c296e6d217"),
                column: "Order",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("add6e376-c3b5-45d2-9ef2-2eca3bbc8b79"),
                column: "Order",
                value: 8);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("af4acbd3-6789-4dd5-8afa-710ca93b0077"),
                column: "Order",
                value: 2);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("c35af576-e2f0-4835-8f81-ff80c68fa202"),
                column: "Order",
                value: 5);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("d3f928a2-ae05-4eff-a68f-06fa4d7963e9"),
                column: "Order",
                value: 7);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("ea75a4cc-15be-46c3-a6bc-514d609ee777"),
                column: "Order",
                value: 6);

            migrationBuilder.UpdateData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("fe0b4683-f7f9-432d-8f14-a685d3e73e71"),
                column: "Order",
                value: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "ColorOption");
        }
    }
}
