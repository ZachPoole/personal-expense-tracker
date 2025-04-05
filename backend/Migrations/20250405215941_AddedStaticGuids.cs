using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedStaticGuids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "ColorOption",
                columns: new[] { "Id", "Color" },
                values: new object[,]
                {
                    { new Guid("5b0a3fc3-eebb-4713-ae3d-c846b00821cd"), "Green" },
                    { new Guid("6513a135-199e-4613-8ea7-12c296e6d217"), "Yellow" },
                    { new Guid("add6e376-c3b5-45d2-9ef2-2eca3bbc8b79"), "Pink" },
                    { new Guid("af4acbd3-6789-4dd5-8afa-710ca93b0077"), "Orange" },
                    { new Guid("c35af576-e2f0-4835-8f81-ff80c68fa202"), "Blue" },
                    { new Guid("d3f928a2-ae05-4eff-a68f-06fa4d7963e9"), "Violet" },
                    { new Guid("ea75a4cc-15be-46c3-a6bc-514d609ee777"), "Indigo" },
                    { new Guid("fe0b4683-f7f9-432d-8f14-a685d3e73e71"), "Red" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("5b0a3fc3-eebb-4713-ae3d-c846b00821cd"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("6513a135-199e-4613-8ea7-12c296e6d217"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("add6e376-c3b5-45d2-9ef2-2eca3bbc8b79"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("af4acbd3-6789-4dd5-8afa-710ca93b0077"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("c35af576-e2f0-4835-8f81-ff80c68fa202"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("d3f928a2-ae05-4eff-a68f-06fa4d7963e9"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("ea75a4cc-15be-46c3-a6bc-514d609ee777"));

            migrationBuilder.DeleteData(
                table: "ColorOption",
                keyColumn: "Id",
                keyValue: new Guid("fe0b4683-f7f9-432d-8f14-a685d3e73e71"));

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
    }
}
