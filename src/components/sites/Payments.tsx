import {memo, useCallback, useEffect, useState} from 'react'
import {
    Button,
    LargeTitle,
    Text,
    Title1,
    Title3,
    TableColumnDefinition,
    createTableColumn,
    TableCellLayout,
    DataGridProps,
    DataGrid,
    DataGridHeaderCell,
    DataGridRow,
    DataGridCell,
    DataGridBody,
    DataGridHeader,
    Dialog,
    DialogTrigger,
    DialogBody,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogSurface,
    Radio,
    RadioGroup,
    ToggleButton,
    useId,
    Label,
    SpinButton,
    SpinButtonProps,
    Field,
    InfoLabel,
    Spinner, MessageBar, MessageBarBody, MessageBarTitle, MessageBarActions
} from "@fluentui/react-components";
import { AddCircleFilled, AddSquareFilled, ArrowStepBackFilled, ArrowSyncFilled, CalendarClockFilled, CheckmarkFilled,
    DismissRegular, ErrorCircleFilled, PaymentFilled } from "@fluentui/react-icons";
import {PaymentHistoryItem} from "../../interfaces/PaymentHistoryItem.tsx";
import axios from "../../../axiosConfig.ts";
import PersonData from "../../interfaces/PersonData.tsx";

const getAction = (action: "topup" | "payment" | "added" | "return"): [JSX.Element, string] => {
    switch (action) {
        case "topup":
            return [<AddCircleFilled />, "Doładowanie salda"];
        case "payment":
            return [<PaymentFilled />, "Płatność"];
        case "added":
            return [<AddSquareFilled />, "Uznanie salda"];
        case "return":
            return [<ArrowStepBackFilled />, "Zwrot środków"];
    }
}

const columns: TableColumnDefinition<PaymentHistoryItem>[] = [
    createTableColumn<PaymentHistoryItem>({
        columnId: 'date',
        compare: (a, b) => {
            return a.date.getTime() - b.date.getTime();
        },
        renderHeaderCell: () => {
            return "Data"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<CalendarClockFilled />}>
                {item.date.toTimeString()}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'type',
        compare: (a, b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Typ zdarzenia"
        },
        renderCell: (item) => {
            const [icon, desc] = getAction(item.type);
            return <TableCellLayout media={icon}>
                {desc}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'status',
        compare: (a,b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Status"
        },
        renderCell: (item) => {
            return <TableCellLayout media={item.status === "success" ? <CheckmarkFilled /> : <ErrorCircleFilled />}>
                {item.status === "success" ? "Sukces" : "Niepowodzenie"}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'description',
        compare: (a,b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Szczegóły"
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.description}</TableCellLayout>
        }
    })
]

const Payments = memo(function() {
    const [data, setData] = useState<PaymentHistoryItem[]>([]);
    const [person, setPerson] = useState<PersonData | null>(null);
    const [spinButtonValue, setSpinButtonValue] = useState<number | null>(20);
    const [retError, setRetError] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successInfo, setSuccessInfo] = useState(true);
    const [sortState, setSortState] = useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
        sortColumn: "carId",
        sortDirection: "ascending",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setSuccessInfo(urlParams.get('success') === "true")

        axios.get("/user", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                setPerson(response.data);
            }).catch(error => {
            console.log(error);
        })
    }, [person, data]);

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [isCorrectData, setValidationState] = useState(false);
    const [isNumberOverLoaded, setOverloadState] = useState(false);
    const [isAction, setActionState] = useState(false);

    const cashId = useId();

    const onSpinButtonChange: SpinButtonProps["onChange"] = useCallback(
        (_ev, data) => {
            if (data.value !== undefined) {
                setValidationState(false);
                setSpinButtonValue(data.value);
            } else if (data.displayValue !== undefined) {
                const newValue = parseFloat(data.displayValue);
                if (!Number.isNaN(newValue)) {
                    if(newValue < 10 || newValue > 500) {
                        setValidationState(true);
                        setOverloadState(true);
                    } else {
                        setSpinButtonValue(newValue);
                        setValidationState(false);
                        setOverloadState(false);
                    }
                } else {
                    setValidationState(true);
                }
            }
        },
        [setSpinButtonValue]
    );

    const toggleCheck = (option: number) => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        setChecked4(false);
        setChecked5(false);
        switch(option) {
            case 1:
                setChecked1(true); break;
            case 2:
                setChecked2(true); break;
            case 3:
                setChecked3(true); break;
            case 4:
                setChecked4(true); break;
            case 5:
                setChecked5(true); break;
        }
    }

    const fetchData = () => {

    }

    const handleBalanceAdding = () => {
        setActionState(true);
        let cashAdd = 0;
        if(checked1) cashAdd = 10;
        if(checked2) cashAdd = 20;
        if(checked3) cashAdd = 50;
        if(checked4) cashAdd = 100;
        if(checked5) cashAdd = spinButtonValue as number;
        axios.put('/user/changeBalance', {
            amount: cashAdd
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem('token')
            }}).then(response => {
                if(response.status === 200) {
                    setDialogOpen(false);
                    window.location.replace("/account/payments?success=true")
                }
        })
    }

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
        setSortState(nextSortState);
    };

    return <>
            {successInfo && <MessageBar intent={"success"} style={{marginTop: "10px"}}>
                <MessageBarBody>
                    <MessageBarTitle>Sukces!</MessageBarTitle>
                    Twoje konto zostało pomyślnie doładowane!{" "}
                </MessageBarBody>
                <MessageBarActions
                    containerAction={
                        <Button
                            aria-label="dismiss"
                            appearance="transparent"
                            icon={<DismissRegular />}
                            onClick={() => setSuccessInfo(false)}
                        />
                    } />
            </MessageBar>}
        <section className={'tablePosition'}>
            <LargeTitle className={"marginsDef"}>Płatności</LargeTitle>
            <Button appearance="primary" icon={<ArrowSyncFilled />} onClick={fetchData}>Odśwież</Button>
        </section>
        <section className={'paymentMethods'}>
            <div className={'saldoHolder'}>
                <div className={'cashAvailable'}>
                    <Title1>{person?.balance || "0.00"} zł</Title1>
                    <InfoLabel info={
                        <>Dostępne środki są aktualizowane co 1 godzinę.</>}><Text>Dostępne środki</Text></InfoLabel>
                </div>
                <div className={'cashAvailable'}>
                    <Dialog modalType="alert" open={dialogOpen}>
                        <DialogTrigger disableButtonEnhancement>
                            <Button icon={<AddCircleFilled/>} appearance="primary" onClick={() => setDialogOpen(true)}>Doładuj środki</Button>
                        </DialogTrigger>
                        <DialogSurface>
                            <DialogBody>
                                {isAction ? <>
                                    <DialogTitle action={null}>
                                        <Spinner appearance="primary" label="Logowanie" />
                                    </DialogTitle>
                                </> : <>
                                    <DialogTitle>Doładuj środki</DialogTitle>
                                    <DialogContent>
                                        <Label required>Wybierz kwotę:</Label>
                                        <div className={"buttonGroup"} style={{margin: '5px 0 10px 0', justifyContent: 'space-between'}}>
                                            <ToggleButton checked={checked1} onClick={() => toggleCheck(1)}>10 zł</ToggleButton>
                                            <ToggleButton checked={checked2} onClick={() => toggleCheck(2)}>20 zł</ToggleButton>
                                            <ToggleButton checked={checked3} onClick={() => toggleCheck(3)}>50 zł</ToggleButton>
                                            <ToggleButton checked={checked4} onClick={() => toggleCheck(4)}>100 zł</ToggleButton>
                                            <ToggleButton checked={checked5} onClick={() => toggleCheck(5)}>inna</ToggleButton>
                                        </div>
                                        {checked5 && <>
                                            <Field label={"Kwota doładowania:"} validationMessage={!isCorrectData ? '' : isNumberOverLoaded ? 'Wartość musi się znajdować w przedziale od 10 do 500' : 'Niepoprawna wartość!'}>
                                                <SpinButton value={spinButtonValue} onChange={onSpinButtonChange} id={cashId} />
                                            </Field>
                                        </>}
                                        {(checked1 || checked2 || checked3 || checked4 || checked5)  &&
                                            <div className={'paymentProvider'}>
                                                <Field label="Wybierz metodę płatności:">
                                                    <RadioGroup defaultValue="p24">
                                                        <Radio value="p24" label="Przelewy24" />
                                                        <Radio value="blik" label="BLIK" />
                                                        <Radio value="rach" label="Dopisz do rachunku telefonicznego" />
                                                        <Radio value="przel" label="Przelew tradycyjny" />
                                                    </RadioGroup>
                                                </Field>
                                            </div>
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <DialogTrigger disableButtonEnhancement>
                                            <Button appearance="secondary" onClick={() => setDialogOpen(false)}>Anuluj</Button>
                                        </DialogTrigger>
                                        <Button appearance="primary" disabled={!checked1 && !checked2 && !checked3 && !checked4 && !checked5} onClick={handleBalanceAdding}>Doładuj</Button>
                                    </DialogActions>
                                </>}
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                </div>
            </div>
        </section>
        <section className={'history'}>
            <Title3>Historia</Title3>
            <DataGrid items={data} columns={columns} sortable sortState={sortState} onSortChange={onSortChange}>
                <DataGridHeader>
                    <DataGridRow>
                        {({renderHeaderCell}) => (
                            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<PaymentHistoryItem>>
                    {({item, rowId}) => (
                        <DataGridRow<PaymentHistoryItem> key={rowId}>
                            {({renderCell}) => (
                                <DataGridCell>{renderCell(item)}</DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>
        </section>
    </>
})

export default Payments
