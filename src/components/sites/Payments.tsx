import {memo, useCallback, useState} from 'react'
import {
    Button,
    LargeTitle,
    Text,
    Input,
    Title1,
    Title3,
    Checkbox,
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
} from "@fluentui/react-components";
import { AddCircleFilled, AddSquareFilled, ArrowStepBackFilled, ArrowSyncFilled, CalendarClockFilled, CheckmarkFilled, ErrorCircleFilled, PaymentFilled, WalletFilled } from "@fluentui/react-icons";
import {PaymentHistoryItem} from "../../interfaces/PaymentHistoryItem.tsx";

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
    const [spinButtonValue, setSpinButtonValue] = useState<number | null>(20);
    const [accountNumber, setAccountNumber] = useState('');
    const [retError, setRetError] = useState(false);
    const [sortState, setSortState] = useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
        sortColumn: "carId",
        sortDirection: "ascending",
    });

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

    }

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
        setSortState(nextSortState);
    };

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, '');
        if(value.length !== 26) {
            setRetError(true)
        } else setRetError(false);
        if (/^\d*$/.test(value)) {
            setAccountNumber(value);
        }
    };

    return <>
        <section className={'tablePosition'}>
            <LargeTitle className={"marginsDef"}>Płatności</LargeTitle>
            <Button appearance="primary" icon={<ArrowSyncFilled />} onClick={fetchData}>Odśwież</Button>
        </section>
        <section className={'paymentMethods'}>
            <div className={'saldoHolder'}>
                <div className={'cashAvailable'}>
                    <Title1>15,68 zł</Title1>
                    <InfoLabel info={
                        <>Dostępne środki są aktualizowane co 1 godzinę.</>}><Text>Dostępne środki</Text></InfoLabel>
                </div>
                <div className={'cashAvailable'}>
                    <Dialog modalType="alert">
                        <DialogTrigger disableButtonEnhancement>
                            <Button icon={<AddCircleFilled/>} appearance="primary">Doładuj środki</Button>
                        </DialogTrigger>
                        <DialogSurface>
                            <DialogBody>
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
                                        <Button appearance="secondary">Anuluj</Button>
                                    </DialogTrigger>
                                    <Button appearance="primary" disabled={!checked1 && !checked2 && !checked3 && !checked4 && !checked5} onClick={handleBalanceAdding}>Doładuj</Button>
                                </DialogActions>
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                    <Dialog modalType="alert">
                        <DialogTrigger disableButtonEnhancement>
                            <Button icon={<WalletFilled />} appearance="secondary">Zwróć środki</Button>
                        </DialogTrigger>
                        <DialogSurface>
                            <DialogBody>
                                <DialogTitle>Zwróć środki</DialogTitle>
                                <DialogContent>
                                    <Field required label={"Podaj numer konta, na które zostaną przekazane środki:"} validationMessage={retError ? 'Numer konta powinien mieć dokładnie 26 cyfr' : undefined}>
                                        <Input required id={cashId} value={accountNumber} onChange={handleAccountNumberChange} />
                                    </Field>
                                    <Checkbox required label="Wyrażam zgodę na pobranie opłaty serwisowej w wysokości 5 zł"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Anuluj</Button>
                                    </DialogTrigger>
                                    <Button appearance="primary">Zwróć</Button>
                                </DialogActions>
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
