using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedColorOptionsSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ColorOption",
                columns: new[] { "Id", "Color" },
                values: new object[,]
                {
                    { new Guid("09058d5d-3de2-40fc-887c-4a9699c8eeb4"), "Blue" },
                    { new Guid("0995f3e2-dca9-4802-99bb-81ed93a158d6"), "Indigo" },
                    { new Guid("354a011c-cb3a-45f7-8da9-86fdc0800ff7"), "Red" },
                    { new Guid("448730a1-e31c-4caf-a99e-a960498c821f"), "Yellow" },
                    { new Guid("5d84af48-ee12-4b7e-b544-ffe49a0d0b4b"), "Violet" },
                    { new Guid("81a855fe-8d5e-4532-8d2f-04d72472ebce"), "Green" },
                    { new Guid("91db5315-78f6-4d9a-8be8-44b17f8695b0"), "Orange" },
                    { new Guid("c4ce2058-b458-4bb3-bb60-52334c449bbf"), "Pink" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("09058d5d-3de2-40fc-887c-4a9699c8eeb4"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("0995f3e2-dca9-4802-99bb-81ed93a158d6"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("354a011c-cb3a-45f7-8da9-86fdc0800ff7"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("448730a1-e31c-4caf-a99e-a960498c821f"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("5d84af48-ee12-4b7e-b544-ffe49a0d0b4b"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("81a855fe-8d5e-4532-8d2f-04d72472ebce"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("91db5315-78f6-4d9a-8be8-44b17f8695b0"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("c4ce2058-b458-4bb3-bb60-52334c449bbf"));
        }
    }
}
