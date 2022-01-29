function reportLines(aCustomer){
    const lines = [];
    lines.push(["name", aCustomer.name])
    lines.push(["location", aCustomer.location])
    // gatherCustomerData(lines, aCustomer);
    return lines;
}

// function gatherCustomerData(out, aCustomer){
//     out.push(["name", aCustomer.name]);
//     out.push(["location", aCustomer.location]);
// }