Option Explicit

Private WithEvents olInboxItems As Items
 
Private Sub Application_Startup()
    Dim objNS As NameSpace
    Set objNS = Application.Session
    Set olInboxItems = objNS.GetDefaultFolder(olFolderInbox).Items
    Set objNS = Nothing
End Sub
    
Private Sub olInboxItems_ItemAdd(ByVal Item As Object)
    On Error Resume Next
    If Item.Attachments.Count > 0 Then
        Dim objAttachments As Outlook.Attachments
        Dim lngCount As Long
        Dim strFile As String
        Dim strfolderPath As String
        Dim sFileType As String
        Dim ssplitName
        Dim i As Long

        Set objAttachments = Item.Attachments
        lngCount = objAttachments.Count
        For i = lngCount To 1 Step -1
            ssplitName = Split(objAttachments.Item(i).FileName, ".")
            
            If ssplitName(UBound(ssplitName)) = "xls" Then
                strFile = objAttachments.Item(i).FileName
                strfolderPath = "C:\Users\Kieran.Black\Documents\barcodevalidator\server\attachments\"
                strFile = strfolderPath & strFile
                objAttachments.Item(i).SaveAsFile strFile
            End If
        Next i
    End If
End Sub

