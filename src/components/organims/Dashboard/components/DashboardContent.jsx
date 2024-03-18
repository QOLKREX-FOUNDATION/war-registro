import React from 'react'
import { FormModal } from '../../../molecules/modals/FormModal'
import { Race } from './Race'
import { Reports } from './Reports'
import { Stadistics } from './Stadistics'

export const DashboardContent = ({ modalType, setShow }) => {

    return (
        <div className="dark:text-white">
            {
                modalType === 'bath' &&
                (<FormModal
                    title="Gestión de Baños"
                    handleClose={setShow}
                >
                    <div className="flex flex-col items-center justify-center">
                    </div>
                </FormModal>
                )
            }
            {
                modalType === 'points' &&
                (<FormModal
                    title="Gestión de Puntos"
                    handleClose={setShow}
                >
                    <div className="flex flex-col items-center justify-center">
                    </div>
                </FormModal>
                )
            }
            {
                modalType === 'cuts' &&
                (<FormModal
                    title="Gestión de Cortes"
                    handleClose={setShow}
                >
                    <div className="flex flex-col items-center justify-center">
                    </div>
                </FormModal>
                )
            }
            {
                modalType === 'race' &&
                (<FormModal
                    title="Gestión de Razas"
                    handleClose={setShow}
                >
                    <Race />
                </FormModal>
                )
            }
            {
                modalType === 'reports' &&
                (<FormModal
                    title="Generar Reportes"
                    handleClose={setShow}
                >
                    <Reports />
                </FormModal>
                )
            }
            {
                modalType === 'stadistics' &&
                (<FormModal
                    title="Ver Estadísticas"
                    handleClose={setShow}
                >
                    <Stadistics />
                </FormModal>
                )
            }
        </div>
    )
}
