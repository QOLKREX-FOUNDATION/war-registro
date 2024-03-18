import React, { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button, IconButton, Tooltip, ListItemIcon, ListItemText, MenuItem, ThemeProvider, createTheme, useTheme, TextField } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { FaEdit, FaSyringe, FaFilter } from "react-icons/fa";
import { AiOutlineShake } from "react-icons/ai";
import { Pet } from "../../templates/PetWizard/Pet";
import { isModule, permisionActive } from "../../../utils/war/permissionVerifi";
import { useWeb3Context } from "../../../contexts";
import { Documents } from "../../templates/Documents";
import { FormModal } from "../../molecules/modals/FormModal";
import { Vaccines } from "../../organims/Vaccines";
import { Status } from "../Status/Status";
import { useStateContext } from "../../../contexts/ContextProvider";
import { darkTheme } from '../../../theme/darkTheme';
import { lightTheme } from '../../../theme/lightTheme';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
    Vaccines as VaccinesIcon,
    Vibration as StatusIcon,
    Description as DocumentsIcon,
    CleaningServices as CleaningServicesIcon,
    BusinessOutlined as BusinessOutlinedIcon,
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Services } from '../../organims/Services';
// import { DateRangePicker } from '@mui/x-date-pickers-pro';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

//defining columns outside of the component is fine, is stable
const dataExample = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 4,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 5,
        firstName: 'John',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 6,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 7,
        firstName: 'John',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 8,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 9,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 10,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 11,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 12,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 13,
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'ABC',
        city: 'New York',
        country: 'USA',
    }
];

export const MaterialTable = ({ data, handleGetRecords }) => {

    const { web3 } = useWeb3Context();
    const [tableData1, setTableData1] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDoc, setOpenDoc] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openVacunnas, setOpenVacunnas] = useState(false);

    const [chip, setChip] = useState("");
    const [pet, setPet] = useState({});
    const [update, setUpdate] = useState("");
    const [vacunnas, setVacunnas] = useState("");
    const [status, setStatus] = useState("");
    const [filter, setFilter] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [columnFilter, setColumnFilter] = useState([]);
    // const [datos, setDatos] = useState([]);
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        currentColor,
        themeSettings,
        setThemeSettings,
    } = useStateContext();

    const isDark = currentMode === "Dark" ? "dark" : "light";

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => {
                    const dateParse = new Date(row.dateRegistring);
                    const timestamp = dateParse.getTime() / 1000 + dateParse.getTimezoneOffset() * 60;
                    const date = dayjs.unix(timestamp).format('DD/MM/YYYY', { utc: false });
                    return dateParse;
                },
                accessorKey: "dateRegistring",
                header: "Registro",
                title: "Registro",
                field: "dateRegistring",
                emptyValue: () => <em></em>,
                type: 'datetime',
                size: 250,
                // filterFn: 'between',
                filterFn: 'lessThanOrEqualTo',
                sortingFn: 'datetime',
                Cell: ({ cell }) => {
                    // console.log(cell)
                    const dateParse = new Date(cell.row.original.dateRegistring);
                    const timestamp = dateParse.getTime() / 1000 + dateParse.getTimezoneOffset() * 60;
                    const date = dayjs.unix(timestamp).format('DD/MM/YYYY', { utc: false });
                    // console.log(date)
                    // console.log(cell.row.original.dateRegistring)
                    return <>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{date}</span>
                            </div>
                        </div>
                    </>;
                },
                Filter: ({ column, rangeFilterIndex, table }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Inicio"
                            onChange={(date) => {
                                // column.setFilterValue([date, endDate]);
                                // console.log(startDate, endDate)
                                // console.log(column.getFilterValue())
                                const parseStartDate = new Date(date);
                                const realStartDate = parseStartDate.getTime() / 1000 + parseStartDate.getTimezoneOffset() * 60;
                                // const date2 = dayjs.unix(realStartDate).format('YYYY - DD - MM');
                                // const date3 = dayjs.unix(realStartDate).format('DD/MM/YYYY', { utc: false });
                                // const date4 = dayjs.unix(realStartDate).format('DD-MM-YYYY', { utc: false });
                                // const date5 = dayjs.unix(realStartDate).format('DD/MM/YY', { utc: false });
                                setStartDate(date)
                                // console.log(date)
                                // console.log(parseStartDate)
                                // console.log(realStartDate)
                                // console.log(date2)
                                // console.log(date3)
                                // console.log(date4)
                                // console.log(date5)
                                // column.setFilterValue(parseStartDate);
                                column.setFilterValue(date);
                                // column.setFilterValue([date, endDate]);
                            }}
                            textField={(params) => <TextField {...params} />}
                            style={{ width: '100px', paddingTop: '10px' }}
                            format='DD/MM/YYYY'
                            value={startDate}
                            slotProps={{
                                textField: {
                                    helperText: 'Filter Mode: Less Than',
                                    sx: { minWidth: '120px' },
                                    variant: 'standard',
                                },
                            }}
                        />
                        {/* <DatePicker
                            label="Fin"
                            onChange={(date) => {
                                const parseEndDate = new Date(date);
                                const realEndDate = parseEndDate.getTime() / 1000 + parseEndDate.getTimezoneOffset() * 60;
                                setEndDate(date)
                                // column.setFilterValue(date);
                                column.setFilterValue([startDate, date]);
                            }}
                            textField={(params) => <TextField {...params} />}
                            style={{ width: '100px', paddingTop: '10px' }}
                            format='DD/MM/YYYY'
                            value={endDate}
                            slotProps={{
                                textField: {
                                    helperText: 'Filter Mode: Less Than',
                                    sx: { minWidth: '120px' },
                                    variant: 'standard',
                                },
                            }}
                        /> */}
                    </LocalizationProvider>
                ),
            },
            {
                accessorKey: "chip",
                header: "Micro Chip",
                title: "Micro Chip",
                field: "chip",
                emptyValue: () => <em></em>,
            },
            {
                accessorKey: "name",
                header: "Mascota",
                title: "Mascota",
                field: "name",
                emptyValue: () => <em></em>,
            },
            {
                accessorKey: "type",
                header: "Tipo",
                title: "Tipo",
                field: "type",
                emptyValue: () => <em></em>,
                size: 60,
            },
            {
                accessorKey: "gender",
                header: "Género",
                title: "Género",
                field: "gender",
                emptyValue: () => <em></em>,
                size: 80,
            },
            {
                accessorKey: 'sterilized',
                header: "Esterilizado",
                title: "Estirilizado",
                field: "sterilized",
                emptyValue: () => <em></em>,
                size: 80,
            },
            {
                accessorKey: "status",
                header: "Estado",
                title: "Estado",
                field: "status",
                emptyValue: () => <em></em>,
                size: 80,
            },
            {
                accessorKey: "adopterName",
                header: "Adoptante",
                title: "Adoptante",
                field: "adopterName",
                emptyValue: () => <em></em>,
                Cell: ({ cell }) => {
                    // console.log(cell)
                    return <span className="text-sm font-medium">
                        {cell.row.original.adopterName} {cell.row.original.adopterLastName}
                    </span>;
                },
            },
            {
                accessorKey: "documentNumber",
                header: "Doc. de identidad",
                title: "Doc. de identidad",
                field: "documentNumber",
                emptyValue: () => <em>null</em>,
                size: 80,
                Cell: ({ cell }) => {
                    // console.log(data)
                    // console.log(cell)
                    const ad = data.adopters.filter(
                        (values) => values.address == cell.row.original.adopter
                    );
                    // console.log(ad[0])
                    return <span className="text-sm font-medium">
                        {ad[0]?.documentNumber ?? "No Disponible"}
                    </span>
                },
            },
            {
                header: "Registrante",
                title: "Registrante",
                accessorKey: "userName",
                field: "userName",
                emptyValue: () => <em></em>,
                size: 80,
            },
        ]
    );

    const columnsCsv = [
        {
            title: "Registro",
            field: "dateRegistring",
        },
        {
            title: "Micro Chip",
            field: "chip",
        },
        {
            title: "Mascota",
            field: "name",
        },
        {
            title: "Tipo",
            field: "type",
        },
        {
            title: "Género",
            field: "gender",
        },
        {
            title: "Raza",
            field: "race",
        },
        {
            title: "Color",
            field: "colour",
        },
        {
            title: "Fecha de Nacimiento",
            field: "date",
        },
        {
            title: "Vacunado",
            field: "vaccines",
        },
        {
            title: "Estirilizado",
            field: "sterilized",
        },
        {
            title: "Adoptante",
            field: "adopterName",
        },
        {
            title: "Doc. de identidad",
            field: "documentNumber"
        },
        {
            title: "Registrante",
            field: "userName",
        }
    ];

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columnsCsv.map((c) => c.title),
    };

    const csvExporter = new ExportToCsv(csvOptions);

    // const filterDataDate = (data) => {
    //     const date3 = dayjs(startDate).format('DD/MM/YYYY')
    //     const date4 = dayjs(endDate).format('DD/MM/YYYY')
    //     // console.log(date1)
    //     // console.log(date2)
    //     // console.log(date3)
    //     // console.log(date4)
    //     // console.log(data)
    //     const dataFilter = data.filter((values) => {
    //         const date5 = dayjs(values.dateRegistring).format('DD/MM/YYYY')
    //         // console.log(date5)
    //         return date5 >= date3 && date5 <= date4
    //     })
    //     // console.log(dataFilter)
    //     return dataFilter
    // }

    useEffect(() => {
        if (permisionActive(web3.account, 1, 2)) {
            setUpdate({
                icon: () => <FaEdit />,
                tooltip: "Editar Mascota",
                onClick: (event, rowData) => {
                    setOpenEdit(true);
                    setChip(rowData.chip);
                },
            });
        }

        if (isModule(web3.account, 5)) {
            setVacunnas({
                icon: () => <FaSyringe />,
                tooltip: "Ver Vacunas",
                onClick: (event, rowData) => {
                    setOpenVacunnas(true);
                    setChip(rowData.chip);
                },
            });
        }

        if (permisionActive(web3.account, 4, 1)) {
            setStatus({
                onClick: (event, rowData) => {
                    setOpenStatus(true);
                    setChip(rowData.chip);
                    setPet(rowData);
                },
                icon: () => <AiOutlineShake />,
                tooltip: "Estado",
            });
        }
    }, [web3.account]);

    useEffect(() => {
        // console.log(data.pets)
        setTableData1(data.pets ?? []);
    }, [data]);

    const handleExportRows = (rows) => {
        // console.log(rows)

        const exportData = rows.map((row) => {
            const ad = data.adopters.filter(
                (values) => values.address == row.original.adopter
            );
            const dateParse = new Date(row.original.dateRegistring);
            const timestamp = dateParse.getTime() / 1000 + dateParse.getTimezoneOffset() * 60;
            const dateRegistring = dayjs.unix(timestamp).format('DD/MM/YYYY', { utc: false });
            const date2Parse = new Date(row.original.date);
            const timestamp2 = date2Parse.getTime() / 1000 + date2Parse.getTimezoneOffset() * 60;
            const dateBirth = dayjs.unix(timestamp2).format('DD/MM/YYYY', { utc: false });
            return {
                dateRegistring: dateRegistring,
                chip: row.original.chip,
                name: row.original.name,
                type: row.original.type,
                gender: row.original.gender,
                race: row.original.race,
                colour: row.original.colour,
                date: dateBirth,
                vaccines: row.original.vaccines.length > 0 ? "Si" : "No",
                sterilized: row.original.sterilized,
                adopterName: row.original.adopterName,
                documentNumber: ad[0]?.documentNumber ?? "No Disponible",
                userName: row.original.userName,
            }
        });

        csvExporter.generateCsv(exportData);
    };

    const handleExportData = () => {
        csvExporter.generateCsv(data);
    };
    return (
        <>
            <ThemeProvider theme={
                currentMode === "Dark" ?
                    darkTheme
                    :
                    lightTheme
            }>
                {
                    tableData1.length > 0 && (
                        <MaterialReactTable
                            columns={columns}
                            data={tableData1}
                            enableRowSelection
                            enableColumnFilterMode
                            positionToolbarAlertBanner="bottom"
                            enableRowActions={true}
                            renderTopToolbarCustomActions={({ table }) => (
                                <Box
                                    sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                                >
                                    {/* <Button
                                        color="primary"
                                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                                        onClick={handleExportData}
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                    >
                                        Export All Data
                                    </Button> */}
                                    <Button
                                        disabled={table?.getPrePaginationRowModel().rows.length === 0}
                                        //export all rows, including from the next page, (still respects filtering and sorting)
                                        onClick={() =>
                                            handleExportRows(table.getPrePaginationRowModel().rows)
                                        }
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                    >
                                        Export All Rows
                                    </Button>
                                    <Button
                                        disabled={table?.getRowModel().rows.length === 0}
                                        //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                                        onClick={() => handleExportRows(table.getRowModel().rows)}
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                    >
                                        Export Page Rows
                                    </Button>
                                    <Button
                                        disabled={
                                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                        }
                                        //only export selected rows
                                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                    >
                                        Export Selected Rows
                                    </Button>
                                </Box>
                            )}
                            renderRowActions={({ row, table }) => (
                                <>
                                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                                        <Tooltip
                                            title="Editar"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="secondary"
                                                onClick={() => {
                                                    setOpenEdit(true);
                                                    setChip(row.original.chip);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Vacunas"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="primary"
                                                // title='Vacunas'
                                                onClick={() => {
                                                    setOpenVacunnas(true);
                                                    setChip(row.original.chip);
                                                }}
                                            >
                                                <VaccinesIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Estado"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="primary"
                                                // title='Estado'
                                                onClick={() => {
                                                    setOpenStatus(true);
                                                    setChip(row.original.chip);
                                                    setPet(row.original);
                                                }}
                                            >
                                                <StatusIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Documentos"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="primary"
                                                // title='Documentos'
                                                onClick={() => {
                                                    setOpenDoc(true);
                                                    setChip(row.original.chip);
                                                }}
                                            >
                                                <DocumentsIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Servicios"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="primary"
                                                // title='Documentos'
                                                onClick={() => {
                                                    setOpenService(true);
                                                    setChip(row.original.chip);
                                                }}
                                            >
                                                <CleaningServicesIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </>
                            )}
                            positionActionsColumn="first"
                            actions
                        />
                    )
                }
                {openEdit && (
                    <FormModal handleClose={setOpenEdit} title="Editar Mascota">
                        <Pet
                            update={true}
                            chip={chip}
                            handleClose={setOpenEdit}
                            handleGetRecords={handleGetRecords}
                        />
                    </FormModal>
                )}

                {openDoc && (
                    <FormModal handleClose={setOpenDoc} title="Documentos">
                        <Documents chip={chip} />
                    </FormModal>
                )}

                {openService && (
                    <FormModal handleClose={setOpenService} title="Servicios (próximamente)">
                        <Services
                            chip={chip}
                        />
                    </FormModal>
                )}

                {openStatus && (
                    <FormModal handleClose={setOpenStatus} title={`Estado`}>
                        <Status
                            chip={chip}
                            pet={pet}
                            handleClose={setOpenStatus}
                            handleGetRecords={handleGetRecords}
                        />
                    </FormModal>
                )}

                {openVacunnas && (
                    <FormModal handleClose={setOpenVacunnas} title="Vacunas">
                        <Vaccines chip={chip} />
                    </FormModal>
                )}
            </ThemeProvider>
        </>
    )
}
