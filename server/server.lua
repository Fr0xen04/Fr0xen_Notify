Fr0xen_Notify_Server = function(source, header, content)
    TriggerClientEvent('Fr0xen_Notify:Send', source, header, content)
end

exports("Fr0xen_Notify", Fr0xen_Notify_Server)
