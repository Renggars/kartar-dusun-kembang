// // components/OrganizationChart.jsx

// import React from "react";
// import Node from "./Node";

// const renderStructure = (data, isRoot = true) => {
//   const { person, children } = data;

//   return (
//     <div className={`flex flex-col items-center ${isRoot ? "w-full" : ""}`}>
//       {/* 1. Node saat ini */}
//       <Node
//         name={person.name}
//         title={person.title}
//         department={person.department}
//         imageUrl={person.imageUrl}
//       />

//       {/* 2. Garis & Anak-anak (Subordinates) */}
//       {children && children.length > 0 && (
//         <div className="flex flex-col items-center w-full">
//           {/* Garis Vertikal ke Bawah dari Induk */}
//           <div className="w-px h-6 bg-gray-500"></div>

//           {/* Garis Horizontal yang Menghubungkan Anak-anak */}
//           <div className="h-px bg-gray-500 w-full relative">
//             {/* Garis Vertikal Pendek di atas garis horizontal untuk koneksi */}
//             {children.map((_, index) => (
//               <div
//                 key={index}
//                 // Menghitung posisi agar garis vertikal berada di tengah setiap node anak
//                 className="absolute top-1/2 -translate-y-1/2 w-px h-6 bg-gray-500"
//                 style={{
//                   left:
//                     children.length === 1
//                       ? "50%"
//                       : `${(index / (children.length - 1)) * 100}%`,
//                   transform: "translateX(-50%)",
//                 }}
//               ></div>
//             ))}
//           </div>

//           {/* Tampilan Anak-anak (Flex container) */}
//           <div
//             className={`flex justify-center w-full ${
//               children.length > 1 ? "mt-6" : "mt-0"
//             }`}
//           >
//             {children.map((child, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-center items-start pt-6 relative ${
//                   children.length > 1 ? "mx-2 sm:mx-4" : ""
//                 }`}
//               >
//                 {/* Garis Vertikal dari Garis Horizontal ke Node Anak */}
//                 <div className="absolute top-0 w-px h-6 bg-gray-500"></div>

//                 {/* Render anak secara rekursif */}
//                 {renderStructure(child, false)}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /**
//  * Komponen Utama OrganizationChart
//  */
// const OrganizationChart = ({ structureData }) => {
//   if (!structureData || !structureData.data)
//     return (
//       <p className="text-white text-center p-8">
//         Data struktur tidak tersedia.
//       </p>
//     );

//   return (
//     <div className="p-4 sm:p-8  flex justify-center items-start overflow-x-auto">
//       <div className="container max-w-7xl">
//         {/* Render struktur dimulai dari root */}
//         <div className="flex justify-center pb-12">
//           {renderStructure(structureData.data)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationChart;
