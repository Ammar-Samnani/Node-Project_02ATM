import inquirer from "inquirer";


interface User {
    account_number: number;
    pin: number;
    money: number;
}


let users: Record<string, User> = {
    "ali" : {
        "account_number" : 123456789,
        "pin" : 1234,
        "money" : 100000
    },
    "ahmed" : {
        "account_number" : 987654321,
        "pin" : 4321,
        "money" : 100000
    },
    "ammar" : {
        "account_number" : 300226041,
        "pin" : 7681,
        "money" : 100000
    }
}


function validation_check(account_number: number, pin: number) {
    for (const user in users) {
        if (users[user].account_number === account_number && users[user].pin === pin) {
            return true;
        }
    }
    return false;
}


function withdrawal(amount_to_be_withdrawal:number, user_name:string, account_number:number, pin:number){
    if (validation_check(account_number, pin)){
        const name = user_name as keyof typeof users;
        const value = users[name];
        if (amount_to_be_withdrawal <= value.money){
            let deducted_amount = value.money - amount_to_be_withdrawal;
            value.money = deducted_amount
            return true
        } else {
            return false
        }

    } else {
        console.log("You have entered Invalid Account Number or Pin!")
    }
}


function cash_deposit(amount_to_be_deposit:number, user_name:string, account_number:number, pin:number){
    if (validation_check(account_number, pin)){
        const name = user_name as keyof typeof users;
        const value = users[name];
        let deducted_amount = value.money + amount_to_be_deposit;
        value.money = deducted_amount
        return true
    } else {
        console.log("You have entered Invalid Account Number or Pin!")
        return false
    }
}


function balance_inquiry(user_name:string, account_number:number, pin:number){
    if (validation_check(account_number, pin)){
        const name = user_name as keyof typeof users;
        const value = users[name];
        console.log("Your Current Balance is $" + value.money)
    } else {
        console.log("You have entered Invalid Account Number or Pin!")
    }
}


const operation = await inquirer.prompt([
    {
    name : "operation_input",
    type : "list",
    message : "Select Operation",
    choices : ["Withdrawal", "Cash Deposit", "Balance Inquiry"]
    }
])

const user_details = await inquirer.prompt([
    {
    name : "user_name_input",
    type : "input",
    message : "Enter your name: "
    },
    {
    name : "user_account_number_input",
    type : "number",
    message : "Enter your account number: "
    },
    {
    name : "user_pin_input",
    type : "number",
    message : "Enter your Pin: "
    }
])


async function atm(){
    if (operation.operation_input === "Withdrawal"){
        const amount_input = await inquirer.prompt([
            {
            name : "amount",
            type : "number",
            message : "Enter the amount to be withdrawal: "
            }
        ]);
        if (withdrawal(amount_input.amount, user_details.user_name_input, user_details.user_account_number_input, user_details.user_pin_input)){
            balance_inquiry(user_details.user_name_input, user_details.user_account_number_input, user_details.user_pin_input)
        } else {
            console.log("Low Balance! Enter Valid Amount")
        }
    }
    else if (operation.operation_input === "Cash Deposit"){
        const amount_input = await inquirer.prompt([
            {
            name : "amount",
            type : "number",
            message : "Enter the amount to be Deposit: "
            }
        ]);
        if (cash_deposit(amount_input.amount, user_details.user_name_input, user_details.user_account_number_input, user_details.user_pin_input)){
            balance_inquiry(user_details.user_name_input, user_details.user_account_number_input, user_details.user_pin_input)
        }
    }
    else if (operation.operation_input === "Balance Inquiry"){
        balance_inquiry(user_details.user_name_input, user_details.user_account_number_input, user_details.user_pin_input)
    }
}


atm()