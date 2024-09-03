function Fr0xen_Notify(header, content)
    SendNUIMessage({
        action = "sendNotification";
        header = header;
        content = content;
    })
end

RegisterNetEvent('Fr0xen_Notify:Send', function(header, content)
    Fr0xen_Notify(header, content)
end)

exports("Fr0xen_Notify", function(header, content)
    Fr0xen_Notify(header, content)
end)

RegisterCommand("TestNotify", function()
    exports["Fr0xen_Notify"]:Fr0xen_Notify('Test.', "Test notification.")
end)
