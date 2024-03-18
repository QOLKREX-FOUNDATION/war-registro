import React from "react";
import { MdEdit } from "react-icons/md";
import { FaSyringe } from "react-icons/fa";

export const TableTailwind = () => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Chip</th>
              <th className="py-3 px-6 text-left">Mascota</th>
              <th className="py-3 px-6 text-center">Adoptante</th>
              <th className="py-3 px-6 text-center">Doc. de identidad</th>
              <th className="py-3 px-6 text-center">Telefono</th>
              <th className="py-3 px-6 text-center">Correo</th>
              <th className="py-3 px-6 text-center">Fecha registrada</th>
              <th className="py-3 px-6 text-center">Editar</th>
              <th className="py-3 px-6 text-center">Vacunas</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">123456</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">test@test.com</td>
              <td className="py-3 px-6 text-center">1/1/1</td>
              <td className="py-3 px-6">
                <MdEdit size={20} />
              </td>
              <td className="py-3 px-6">
                <FaSyringe size={20} />
              </td>
            </tr>

            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">123456</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">test@test.com</td>
              <td className="py-3 px-6 text-center">1/1/1</td>
              <td className="py-3 px-6">
                <MdEdit size={20} />
              </td>
              <td className="py-3 px-6">
                <FaSyringe size={20} />
              </td>
            </tr>

            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">123456</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </div>
                  <span>Eshal Rosas</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">123456</td>
              <td className="py-3 px-6 text-center">test@test.com</td>
              <td className="py-3 px-6 text-center">1/1/1</td>
              <td className="py-3 px-6">
                <MdEdit size={20} />
              </td>
              <td className="py-3 px-6">
                <FaSyringe size={20} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
