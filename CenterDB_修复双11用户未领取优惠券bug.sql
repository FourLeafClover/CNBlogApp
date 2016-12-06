INSERT INTO [OverseaECommerceManagement].[dbo].[CouponCode_CustomerLog]
  ([CouponSysNo]
  ,[CouponCode]
  ,[CustomerSysNo]
  ,[GetCouponCodeDate]
  ,UserCodeType
  ,[InDate]
  ,[InUser]
  )
VALUES
  (5264
  ,'GHJFGH'
  ,630159 
  ,GETDATE()
  ,'A'
  ,GETDATE()
  ,'Website')

UPDATE TOP(1) OverseaECommerceManagement.dbo.SignReward SET [Status] = 2  WHERE SysNo = 2933

  Insert into [IPP3].[dbo].[SMS](
       [CellNumber]
      ,[SMSContent]
      ,[Priority]
      ,[RetryCount]
      ,[CreateTime] 
      ,[Status]
      ,[CreateUserSysno]
      ,[CompanyCode]
      ,[LanguageCode]
      ,[StoreCompanyCode]
      ,[Type]
  )
  Values(
    '13818087716'
    ,'恭喜小主获双11邀请红包1张，满100减15\200减30\300减45，劲享阶梯满减（限双11当天使用），详询KJT.COM！'
    ,1 
    ,0
    ,GETDATE() 
    ,0
    ,630159
    ,''
    ,''
    ,''
    ,3
  )